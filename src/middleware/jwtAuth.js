import {
  verify,
  decode,
  TokenExpiredError,
  sign,
} from 'jsonwebtoken';

export const renewJwt = (token) => {
  let decodedToken;
  try {
    decodedToken = verify(token, process.env.JWT_KEY);
  } catch (error) {
    if (!(error instanceof TokenExpiredError)) {
      throw error;
    }
    decodedToken = decode(token);
  }

  const now = new Date();
  const refreshExpDate = new Date(0);
  refreshExpDate.setUTCSeconds(decodedToken.exp + 86400); // one day after expiry date

  if (refreshExpDate.getTime() < now.getTime()) {
    throw new Error('invalid token');
  }

  const authToken = sign({ _id: decodedToken._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  return authToken;
};

export default (req, res, next) => {
  try {
    const token = verify(req.headers.authorization, process.env.JWT_KEY);
    req.userId = token._id;
  } catch (error) {
    return res.status(401).json({
      status: { code: 401, message: 'authorization problem' },
      errors: [error.message],
    });
  }

  return next();
};
