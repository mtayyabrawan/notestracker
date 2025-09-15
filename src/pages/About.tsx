function About() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-center text-xl font-medium" id="about-us">
          About Us
        </h1>
      </div>
      <div className="px-20 py-5 leading-[2.5]">
        <p className="text-justify text-sm leading-[2.5] text-pretty">
          Welcome to NotesTracker, your go to platform for managing notes in the
          cloud. Whether you need to note down ideas, create task lists, or
          store important information, NotesTracker makes it easy and accessible
          from anywhere. With{" "}
          <span className="font-medium">2FA (Two Factor Authorization)</span>{" "}
          based secure login, signup, and essential note management features
          like adding, deleting, and updating notes, NotesTracker ensures your
          data stays safe and organized.
        </p>
        <h2 className="font-medium" id="why-notestracker">
          Why NotesTracker?
        </h2>
        <p className="text-justify text-sm leading-[2.5] text-pretty">
          NotesTracker is designed to be more than just a note taking app
          it&apos;s built with a focus on simplicity and user experience. Unlike
          other apps, the clean, intuitive UI allows you to navigate
          effortlessly and focus on what matters most your notes. No unnecessary
          complexity, just a smooth, fast, and modern design built using Reactjs
          and Tailwind CSS.
        </p>
        <h2 className="font-medium" id="who-we-are">
          Who We Are?
        </h2>
        <p className="text-justify text-sm leading-[2.5] text-pretty">
          NotesTracker is the brainchild of{" "}
          <a
            href="https://mtayyabrawan.site"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            Muhammad Tayyab
          </a>
          , a passionate web developer who created this project as part of his
          portfolio. As a developer with 1 year of expertise in <u>Nextjs</u>,{" "}
          <u>Reactjs</u>, <u>Nodejs</u>, <u>TypeScript</u>, <u>JavaScript</u>,{" "}
          <u>TailwindCSS</u>, and solid experience with <u>Git</u> and{" "}
          <u>GitHub</u>,{" "}
          <a
            href="https://mtayyabrawan.site"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            Muhammad Tayyab
          </a>{" "}
          has also a good experience in technologies like <u>Firebase</u>,{" "}
          <u>Python</u>, <u>PHP</u>, <u>Cpp</u> and <u>WordPress</u>.
        </p>
        <h2 className="font-medium" id="vision-behind-notestracker">
          The Vision Behind NotesTracker
        </h2>
        <p className="text-justify text-sm leading-[2.5] text-pretty">
          The vision behind NotesTracker is to provide a simple, secure, and
          efficient way for users to manage their notes in the cloud. Whether
          you&apos;re a student, professional, or someone who loves staying
          organized, NotesTracker offers the tools you need to stay productive
          without the clutter of extra features.
        </p>
      </div>
    </div>
  );
}

export default About;
