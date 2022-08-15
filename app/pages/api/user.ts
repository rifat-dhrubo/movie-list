import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "lib/auth/session";
import { SignInResponse } from "types/auth.type";
import { ROUTES } from "utils/routes";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, accessToken } = req.session;
  if (user == null || accessToken == null) {
    // redirect to sign in page
    res.status(307).redirect(ROUTES.SIGN_IN);
  }
  console.log(req.method);
  if (req.method === "GET") {
    res.status(200).json({
      ...req.session,
    });
  } else if (req.method === "PATCH") {
    const { user } = req.body;
    req.session.user = user;
    req.session.save();
    res.status(200).json(req.session);
  } else {
    res.status(405).json({
      message: "Method not allowed",
    });
  }
}
