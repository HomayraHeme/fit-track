import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongodb";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const db = await connectToDB();
                const users = db.collection("users");
                const user = await users.findOne({ email: credentials.email.toLowerCase() });

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return { id: user._id.toString(), name: user.name, email: user.email };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // Called whenever a user signs in
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    const db = await connectToDB();
                    const users = db.collection("users");

                    // Check if user already exists
                    const existingUser = await users.findOne({ email: user.email });
                    if (!existingUser) {
                        // Create new user in MongoDB
                        const result = await users.insertOne({
                            name: user.name,
                            email: user.email,
                            createdAt: new Date(),
                        });
                        user.id = result.insertedId.toString();
                    } else {
                        user.id = existingUser._id.toString();
                    }
                } catch (err) {
                    console.error("Error creating Google user:", err);
                    return false; // Sign-in fails
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user?.id) token.id = user.id;
            return token;
        },

        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
