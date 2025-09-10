import { CreateUserParams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.prcv.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: "6881479c000ae58bd384",
  userCollectionId: "688147b9003cae733412",
};

export const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint!)
  .setProject(appWriteConfig.projectId!)
  .setPlatform(appWriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
const avatar = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error("Failed to create user account");
    }
    await signIn({
      email,
      password,
    });

    const avatarUrl = avatar.getInitialsURL(name);

    return await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name,
        email,
        avatar: avatarUrl,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(error as string);
  }
};


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if(!currentAccount) {
    throw Error;
    }
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if(!currentUser){
      throw Error;
    }
    return currentUser.documents[0] as User;
    // return {
    //   id: user.$id,
    //   name: user.name || "",
    //   email: user.email || "",
    //   avatar: user.prefs?.avatar || "",
    // };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};