import React from "react";

const AboutPage = () => {
  return (
    <div className="flex h-full w-full flex-col p-8 md:p-24">
      <h1 className="mb-6 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Israbot
      </h1>
      <div className="mx-auto max-w-3xl">
        <p className="text-md mb-4 font-serif leading-7 md:text-xl [&:not(:first-child)]:mt-6">
          The idea behind this application is to give us the necessary
          information in order for us to have the power to respond to any stupid
          comment we might see across the web.
        </p>
        <p className="text-md mb-4 font-serif leading-7 md:text-xl [&:not(:first-child)]:mt-6">
          During the ongoing war we have seen millions of negative comments
          about Israel and the Jewish people. We have also seen a lot of people
          who are not familiar with the conflict and due to the lack of
          information they are easily influenced by the negative comments.
        </p>
        <p className="text-md mb-4 font-serif leading-7 md:text-xl [&:not(:first-child)]:mt-6">
          We believe that if we can give them the necessary information, in
          correct english grammar we can change their opinion and make them
          understand who is the evil side in this story.
        </p>
        <p className="text-md mb-4 font-serif leading-7 md:text-xl [&:not(:first-child)]:mt-6">
          This tool provides information according to the user&apos;s request.
          and stands strong with israel.
        </p>
        <p className="text-sm text-muted-foreground">
          This tool is powered by OpenAI&apos;s GPT-3. Any information provided
          by this tool is not guaranteed to be accurate. Please use your own
          judgement.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
