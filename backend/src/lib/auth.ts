export async function requireAdmin(req: any): Promise<{ sub: string; email?: string }> {
  await req.jwtVerify();
  const user = req.user as { sub?: string; email?: string };
  if (!user?.sub) {
    const err: any = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }
  return { sub: user.sub, email: user.email };
}
