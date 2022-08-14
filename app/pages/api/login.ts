import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { AuthProps, sessionOptions } from "lib/auth/session";
import { SignInResponse } from "types/auth.type";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse>
) {
  const { access_token, user } = req.body;

  try {
    req.session.user = user;
    req.session.accessToken = access_token;

    await req.session.save();

    res.json(user);
  } catch (error) {
    res.status(500).json(error as any);
  }
}
