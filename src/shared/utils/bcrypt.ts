import * as bcrypt from 'bcrypt';

export const encodePassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcrypt.genSaltSync());
};

export const encode = async (content: string): Promise<string> => {
  return bcrypt.hash(content, bcrypt.genSaltSync());
};

export const passwordCompare = (
  plainText: string,
  contentCompare: string,
): Promise<boolean> => bcrypt.compare(plainText, contentCompare);

export const compare = (
  plainText: string,
  contentCompare: string,
): Promise<boolean> => bcrypt.compare(plainText, contentCompare);
