import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

function Contact() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-center text-xl font-medium" id="about-us">
          Contact Us
        </h1>
      </div>
      <div className="space-y-8 px-20 py-5">
        <div className="mx-auto flex w-fit flex-col gap-4 text-sm">
          <div className="flex w-full items-center justify-start gap-4">
            <IconMail />
            <a href="mailto:tayyabpasah1918@gmail.com" target="_blank">
              tayyabpasha1918@gmail.com
            </a>
          </div>
          <div className="flex w-full items-center justify-start gap-4">
            <IconPhone />
            <a href="mailto:+923141971643@gmail.com" target="_blank">
              +923141971643
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/mtayyabrawan"
            target="_blank"
            className="rounded-full bg-neutral-700 p-1"
          >
            <IconBrandLinkedin className="h-5 text-neutral-100" />
          </a>
          <a
            href="https://www.github.com/mtayyabrawan"
            target="_blank"
            className="rounded-full bg-neutral-700 p-1"
          >
            <IconBrandGithub className="h-5 text-neutral-100" />
          </a>
          <a
            href="https://www.x.com/mtayyabrawan"
            target="_blank"
            className="rounded-full bg-neutral-700 p-1"
          >
            <IconBrandX className="h-5 text-neutral-100" />
          </a>
          <a
            href="https://www.instagram.com/mtayyabrawan"
            target="_blank"
            className="rounded-full bg-neutral-700 p-1"
          >
            <IconBrandInstagram className="h-5 text-neutral-100" />
          </a>
          <a
            href="https://www.facebook.com/mtayyabrawan"
            target="_blank"
            className="rounded-full bg-neutral-700 p-1"
          >
            <IconBrandFacebook className="h-5 text-neutral-100" />
          </a>
          <a
            href="https://www.youtube.com/@mtayyabrawan"
            target="_blank"
            className="rounded-full bg-neutral-700 p-1"
          >
            <IconBrandYoutube className="h-5 text-neutral-100" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
