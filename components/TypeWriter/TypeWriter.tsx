import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import styles from './TypeWriter.module.scss';

interface ITypeWriterProps {
  texts: Array<string>;
}
export function TypeWriter(props: ITypeWriterProps): JSX.Element {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elRef.current) {
      return;
    }

    const typed = new Typed(elRef.current, {
      strings: props.texts,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, [props.texts]);

  return (
    <div className={styles.typeWriter}>
      <span ref={elRef}></span>
    </div>
  );
}
