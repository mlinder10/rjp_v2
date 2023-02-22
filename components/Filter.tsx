import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../src/styles/filter.module.css";

type filterProps = {
  options: string[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
};

export default function Filter({
  options,
  selected,
  setSelected,
}: filterProps) {
  const [showing, setShowing] = useState(false);

  function toggleOptions() {
    if (showing) setShowing(false);
    else setShowing(true);
  }

  function changeFilter(change: string) {
    let fil = [...selected];
    if (fil.includes(change)) setSelected(fil.filter((f) => f !== change));
    else {
      fil.push(change);
      setSelected(fil);
    }
  }

  useEffect(() => {
    if (selected.length === options.length) setShowing(false);
  }, [selected, options.length]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.selected}>
        {selected.map((s) => (
          <div key={s} className={styles["single-selected"]}>
            <span>{s}</span>
            <span onClick={() => changeFilter(s)} className={`${styles.close} material-symbols-outlined`}>
              close
            </span>
          </div>
        ))}
      </div>
      <div className={styles.right}>
        <div className={styles.break}></div>
        <span
          className={`${showing ? styles.toggle : styles.drop} material-symbols-outlined`}
          onClick={toggleOptions}
        >
          arrow_drop_down
        </span>
      </div>
      <div className={styles.options}>
        {options.map((o) => (
          showing && !selected.includes(o) && <p
            key={o}
            className={styles.visible}
            onClick={() => changeFilter(o)}
          >
            {o}
          </p>
        ))}
      </div>
    </section>
  );
}
