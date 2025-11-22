export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;
  const expiresAt = body.expiresAt as string | undefined;

  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      },
    );
  }

  const expiresDate = expiresAt
    ? new Date(expiresAt).toUTCString()
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

  return Response.json(
    { message: "Token đã được lưu" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
      },
    },
  );
}

export async function DELETE(_request: Request) {
  return Response.json(
    { message: "Đăng xuất thành công" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`,
      },
    },
  );
}
