import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function UserProfile() {
  /*  const router = useRouter();
  const { data: session, status } = useSession();
  // Redirect away if NOT auth
  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }

  if (!session) {
    router.replace("/auth");
    return null;
  }
 */

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
