// app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="resume-section" id="about">
        <div className="resume-section-content">
          <h1 className="mb-0">
            Kevin Victor <span className="text-primary">Lepiten</span>
          </h1>
          <div className="subheading mb-5">
            Libertad, Bogo City, Cebu 6010 · (+63) 915 518 1798 ·
            <Link href="mailto:lepitenkevin@gmail.com">
              lepitenkevin@gmail.com
            </Link>
            <br />
            Skype: lepitenkevin
          </div>
          <h3>Hire Me!</h3>
          <Link href="tel:+639155181798" className="btn btn-secondary">
            Call Now! (+63) 915 518 1798
          </Link>

          <p className="lead mb-5 mt-4">
            As a Full Stack Developer with over 12 years of experience, I
            specialize in creating dynamic and user-friendly websites for a
            diverse range of industries. My expertise spans from custom theme
            development and plugin customization to full-stack system
            integration and performance optimization. I am proficient in PHP,
            JavaScript, HTML5, CSS3, and am experienced with modern web
            technologies. I also have skills in using SQL and NoSQL databases,
            ensuring robust backend solutions. My approach combines technical
            skill with a keen aesthetic sense to deliver functional and visually
            compelling WordPress sites. I pride myself on my ability to
            translate client needs into seamless, scalable web solutions that
            enhance user engagement and drive business success.
          </p>

          <div className="social-icons">
            <Link
              href="https://www.linkedin.com/in/kevinlepiten/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link
              href="https://github.com/lepitenkevin/"
              target="_blank"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </Link>
            <Link
              href="https://www.youtube.com/c/VMankevofficial/"
              target="_blank"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </Link>
            <Link
              href="https://www.facebook.com/varcharnamekevin/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              href="https://www.onlinejobs.ph/jobseekers/info/425554"
              target="_blank"
              aria-label="OnlineJobs.ph"
            >
              <i className="fa-brands fa-whmcs"></i>
            </Link>
          </div>
        </div>
      </section>
      <hr className="m-0" />
    </>
  );
}
