import { useAuth, useProfile } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";
import SpinnerLoader from "src/components/reusable/SpinnerLoader";

const Profile = () => {
  /**
   * component states
   */
  const { generateAvatar } = appUtils;
  const { profile, isFetchingProfile } = useProfile();
  const { user } = useAuth();

  return (
    <section className="w-[18rem] px-2">
      {isFetchingProfile ? (
        <SpinnerLoader color="fill-c_yellow" />
      ) : (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={generateAvatar(profile?.attributes?.name)}
              alt=""
              className="h-16 w-16  rounded-full"
            />
          </div>

          <div className="ml-1">
            <div className="text-lg font-semibold capitalize text-primary">
              {profile?.attributes?.name ?? user?.name}
            </div>

            <div className="whitespace-nowrap text-base text-primary/50">
              {profile?.attributes?.email ?? user?.email}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
