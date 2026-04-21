import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// นี่คือจุดรวมพลของ Auth Logic แบบเรียบง่ายที่สุดเพื่อให้ระบบรันได้ก่อน
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // ตรงนี้ในอนาคตเราจะเชื่อมกับ MongoDB ที่ท่านให้มา
                // ตอนนี้คืนค่า dummy เพื่อให้ระบบไม่ Error เวลาเรียกใช้
                if (credentials?.username === "glace_admin" && credentials?.password === "PsyberLink_glace") {
                    return { id: "1", name: "Admin", role: "admin" };
                }
                return null;
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };