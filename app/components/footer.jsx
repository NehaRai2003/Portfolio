// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLogoGithub } from 'react-icons/io';

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      <div className="mx-auto flex flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row sm:px-10 lg:max-w-[70rem] xl:max-w-[76rem]">
        <p className="text-sm text-[var(--muted)]">
          © {new Date().getFullYear()}{' '}
          <span className="font-display font-semibold text-gradient">{personalData.name}</span>
          {' '}· Crafted with 💜
        </p>
        <div className="flex items-center gap-3">
          {personalData.github && (
            <Link target="_blank" href={personalData.github} aria-label="GitHub" className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white">
              <IoLogoGithub size={20} />
            </Link>
          )}
          <Link target="_blank" href={personalData.linkedIn} aria-label="LinkedIn" className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white">
            <BiLogoLinkedin size={20} />
          </Link>
          <Link href={`mailto:${personalData.email}`} aria-label="Email" className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white">
            <HiOutlineMail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
