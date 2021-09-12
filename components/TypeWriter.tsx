import { useEffect, useRef } from 'react';
import styles from './TypeWriter.module.scss';

interface ITypeWriterProps {
  text: string;
}
export function TypeWriter(props: ITypeWriterProps): JSX.Element {
  const textHideRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textCursorRef = useRef<HTMLDivElement>(null);

  let isStartet = false;

  function typing_animation() {
    isStartet = true;

    const text_hide_element = () => textHideRef!.current as HTMLElement;
    const text_element = () => textRef!.current as HTMLElement;
    const text_cursor_element = () => textCursorRef!.current as HTMLElement;

    let text_array = text_element().innerHTML.split('');
    let text_array_slice = text_element().innerHTML.split(' ');
    let text_len = text_array.length;

    const word_len = text_array_slice.map((word) => {
      return word.length;
    });

    console.log(word_len);

    let timings: KeyframeAnimationOptions = {
      easing: `steps(${Number(word_len[0] + 1)}, end)`,
      delay: 2000,
      duration: 2000,
      fill: 'forwards',
    };

    let cursor_timings = {
      duration: 700,
      iterations: Infinity,
      easing: 'cubic-bezier(0,.26,.44,.93)',
    };

    text_cursor_element().animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 0,
          offset: 0.7,
        },
        {
          opacity: 1,
        },
      ],
      cursor_timings
    );

    if (text_array_slice.length == 1) {
      timings.easing = `steps(${Number(word_len[0])}, end)`;

      let reveal_animation = text_hide_element().animate([{ left: '0%' }, { left: `${(100 / text_len) * word_len[0]}%` }], timings);

      text_cursor_element().animate([{ left: '0%' }, { left: `${(100 / text_len) * word_len[0]}%` }], timings);

      reveal_animation.onfinish = () => {
        setTimeout(() => {
          text_hide_element().animate([{ left: '0%' }], {
            duration: 2000,
            easing: 'cubic-bezier(.73,0,.38,.88)',
          });
          text_cursor_element().animate([{ left: '0%' }], {
            duration: 2000,
            easing: 'cubic-bezier(.73,0,.38,.88)',
          });
          typing_animation();
        }, 1000);
      };
    } else {
      text_hide_element().animate([{ left: '0%' }, { left: `${(100 / text_len) * (word_len[0] + 1)}%` }], timings);

      text_cursor_element().animate([{ left: '0%' }, { left: `${(100 / text_len) * (word_len[0] + 1)}%` }], timings);
    }

    for (let i = 1; i < text_array_slice.length; i++) {
      console.log(word_len);
      console.log(text_array_slice.length);
      const single_word_len = word_len[i];
      console.log(single_word_len);

      let left_instance = 0;

      if (i == 1) {
        left_instance = (100 / text_len) * (word_len[i - 1] + 1);
        console.log(left_instance);
      }

      let timings_2: KeyframeAnimationOptions = {
        easing: `steps(${Number(single_word_len + 1)}, end)`,
        delay: (2 * (i + 1) + 2 * i) * 1000,
        // delay: ((i*2)-1)*1000,
        duration: 2000,
        fill: 'forwards',
      };

      if (i == text_array_slice.length - 1) {
        timings_2.easing = `steps(${Number(single_word_len)}, end)`;
        let reveal_animation = text_hide_element().animate(
          [{ left: `${left_instance}%` }, { left: `${left_instance + (100 / text_len) * word_len[i]}%` }],
          timings_2
        );

        text_cursor_element().animate(
          [{ left: `${left_instance}%` }, { left: `${left_instance + (100 / text_len) * word_len[i]}%` }],
          timings_2
        );

        reveal_animation.onfinish = () => {
          setTimeout(() => {
            text_hide_element().animate([{ left: '0%' }], {
              duration: 2000,
              easing: 'cubic-bezier(.73,0,.38,.88)',
            });
            text_cursor_element().animate([{ left: '0%' }], {
              duration: 2000,
              easing: 'cubic-bezier(.73,0,.38,.88)',
            });
            typing_animation();
          }, 1000);
        };
      } else {
        text_hide_element().animate(
          [{ left: `${left_instance}%` }, { left: `${left_instance + (100 / text_len) * (word_len[i] + 1)}%` }],
          timings_2
        );

        text_cursor_element().animate(
          [{ left: `${left_instance}%` }, { left: `${left_instance + (100 / text_len) * (word_len[i] + 1)}%` }],
          timings_2
        );
      }

      left_instance = left_instance + (100 / text_len) * (word_len[i] + 1);
    }
  }

  useEffect(() => {
    console.log('init type writer');
    // https://css-tricks.com/typewriter-animation-that-handles-anything-you-throw-at-it/

    if (!isStartet) {
      typing_animation();
    }
  }, [textHideRef, textRef, textCursorRef, typing_animation]);

  return (
    <div className={styles.container}>
      <div ref={textHideRef} className={styles.text_hide} />
      <div ref={textRef} className={styles.text}>
        {props.text}
      </div>
      <div ref={textCursorRef} className={styles.text_cursor} />
    </div>
  );
}
