import { Fragment } from 'react';

/** Renders text as word > char spans so GSAP can animate each letter. */
export function Chars({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="word">
            {[...word].map((ch, ci) => (
              <span className="char" key={ci}>{ch}</span>
            ))}
          </span>
          {wi < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  );
}

/** Renders text as word spans for scroll-scrubbed highlighting. */
export function Words({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">{w}</span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  );
}
