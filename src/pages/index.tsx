import { homePageImage, homePageImageAdmin } from "@/assets";
import { Logo, NavLink } from "@/components";
import { useAuth } from "@/hooks";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  /**
   * page states
   */
  const { user } = useAuth();

  /**
   * page functions
   */

  return (
    <>
      <Head>
        <title>Tadika Kemas</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="themeBorder flex h-full items-center justify-center  border border-primary/50">
        {user?.role === "admin" ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:px-3">
            <div className="flex flex-col ">
              <Logo logo_styles="text-[3rem]" dot_styles="w-2 h-2 bg-orange" />
              <p className="font-bold text-primary lg:whitespace-normal">
                Easy and faster student management.
              </p>

              <p className="text-sm  text-primary/50">
                Let&apos;s make it work.
              </p>

              <div className={`mt-6 w-fit`}>
                <NavLink
                  route={{ to: "/tech/school", name: "Get Started" }}
                  fullWidth={false}
                  type="large"
                  active
                />
              </div>
            </div>

            <div className="w-[25rem] md:w-[30rem] lg:w-[32rem]">
              <Image
                src={homePageImageAdmin}
                alt=""
                className="rounded-[2rem] object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:px-3">
            <div className="flex flex-col ">
              <Logo logo_styles="text-[3rem]" dot_styles="w-2 h-2 bg-orange" />
              <p className="font-bold text-primary lg:whitespace-normal">
                Putting Your Child&apos;s Future in Great Motion
              </p>

              <p className="text-sm  text-primary/50">
                Lets Work together for a brighter future.
              </p>

              <div className={`mt-6 w-fit`}>
                <NavLink
                  route={{ to: "/stud/performance", name: "Get Started" }}
                  fullWidth={false}
                  type="large"
                  active
                />
              </div>
            </div>

            <div className="w-[25rem] md:w-[30rem] lg:w-[35rem]">
              <Image
                src={homePageImage}
                alt=""
                className=" rounded-[2rem] object-cover"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
