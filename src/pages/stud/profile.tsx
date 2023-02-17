import {
  Button,
  Error,
  Notifications,
  SpinnerLoader,
  Title,
} from "@/components";
import { useAuth, useProfile } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth_schemas } from "@/schemas";

const Profile = () => {
  /**
   * page states
   */
  const { profile, isFetchingProfile } = useProfile();
  const { generateAvatar } = appUtils;
  const { isUpdatingPassword, updatePasswordMutateAsync, user } = useAuth();

  const { passwordUpdateSchema } = auth_schemas;
  type PasswordUpdatedSchema = z.infer<typeof passwordUpdateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordUpdatedSchema>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<PasswordUpdatedSchema> = async ({
    password,
  }) => {
    if (password === "") {
      Notifications.errorNotification("Enter the new password.");
      return;
    }

    await updatePasswordMutateAsync({
      email: user?.email || "",
      password: password,
    });
  };

  return (
    <section className="h-full">
      {isFetchingProfile ? (
        <div className="themeBorder flex h-full justify-center border">
          <SpinnerLoader color="fill-primary" />
        </div>
      ) : (
        <div className="h-full">
          <div className="themeBorder h-[24rem] overflow-y-scroll border py-3 px-2 scrollbar-hide">
            <Title title="Your Profile Information." />

            <div className="items-center justify-center gap-3 lg:flex">
              <div className="">
                {/* profile */}
                <div className="mt-2  rounded-md border px-4 ">
                  <Title title="Personal Info" />

                  <div className=" mt-2 ">
                    <div className="p-2">
                      <div className="flex items-center gap-3">
                        {/* image */}
                        <img
                          src={generateAvatar(profile?.attributes?.email)}
                          alt=""
                          className="h-[6rem] w-[6rem] rounded-full object-cover sm:hidden md:block"
                        />

                        <div className="flex flex-col ">
                          <span className="first-letter:capitalize">
                            {profile?.attributes?.email}
                          </span>

                          <div className="flex gap-3">
                            <span className="text-primary/50 first-letter:capitalize">
                              {profile?.attributes?.name}
                            </span>

                            <span className="text-primary/50 first-letter:capitalize">
                              {profile?.attributes?.regNumber}
                            </span>
                          </div>

                          <div className="flex justify-center">
                            <span className="mt-2 w-fit bg-orange px-4 first-letter:capitalize">
                              {profile?.attributes?.race}
                            </span>

                            <span className="mt-2 w-fit bg-primary px-4 text-white first-letter:capitalize">
                              {profile?.attributes?.age} years old
                            </span>
                          </div>

                          <span className="mt-2 w-fit  px-4 text-primary/50 first-letter:capitalize">
                            Born In {profile?.attributes?.dateOfBirth}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* parental info */}
                <div className="mt-4 rounded-md border px-4">
                  <Title title="Your Parents" />

                  <div className=" mt-2">
                    <div className="flex justify-between p-4  md:justify-center">
                      <div>
                        <Title title="Father" />

                        <div className="flex flex-col items-center gap-2">
                          <span className="mt-2 w-fit  pl-4   first-letter:capitalize">
                            {profile?.attributes?.fatherName},
                          </span>

                          <span className="mt-2 w-fit text-primary/50">
                            {profile?.attributes?.fatherPhone}
                          </span>
                        </div>
                      </div>

                      <div>
                        <Title title="Mother" />

                        <div className="flex flex-col items-center gap-2">
                          <span className="mt-2 w-fit  pl-4   first-letter:capitalize">
                            {profile?.attributes?.motherName},
                          </span>

                          <span className="mt-2 w-fit text-primary/50">
                            {profile?.attributes?.motherPhone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* school info */}
              <div className="mt-4 rounded-md border px-4">
                <Title title="School" />

                <div className=" mt-2 ">
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary first-letter:capitalize">
                        {profile?.attributes?.class}
                      </span>

                      <span className="text-primary/50 first-letter:capitalize">
                        COD: {profile?.attributes?.cob}
                      </span>
                    </div>

                    <span className="mt-2 w-fit  bg-primary px-4 text-white first-letter:capitalize">
                      Enrolled In {profile?.attributes?.enrollDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* update password */}
          <div>
            <div className="mt-6 flex justify-center ">
              <form
                className="w-full space-y-1 rounded-[2rem] p-6 sm:w-3/4 lg:w-1/2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Title title="Updated Your Password" title_styles="text-lg" />
                <section className="flex w-full flex-col gap-4 py-3">
                  <div className="relative">
                    <input
                      type="password"
                      {...register("password")}
                      className="input peer"
                      placeholder="Password"
                    />
                    <label className="input_label">Password</label>

                    {errors["password"] && (
                      <Error errorMessage={errors["password"].message} />
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      {...register("confirm")}
                      className="input peer"
                      placeholder="Confirm Password"
                    />
                    <label className="input_label">Confirm Password</label>

                    {errors["confirm"] && (
                      <Error errorMessage={errors["confirm"].message} />
                    )}
                  </div>
                </section>

                <div className="flex justify-end">
                  <Button
                    title={
                      isUpdatingPassword ? (
                        <SpinnerLoader color="fill-white" />
                      ) : (
                        "Update"
                      )
                    }
                    intent="primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
