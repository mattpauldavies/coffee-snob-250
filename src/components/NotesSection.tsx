import { noteItems, notes } from '../content/episode';
import { Photo } from './Photo';
import styles from './NotesSection.module.css';

export function NotesSection() {
  return (
    <section id="notes" className={`sectionPad ${styles.section}`} aria-label="Riding it yourself">
      <div className={styles.inner}>
        <div className={styles.column}>
          <div className={styles.head}>
            <span className={`label ${styles.kicker}`}>{notes.kicker}</span>
            <h2 className={styles.title}>{notes.title}</h2>
          </div>

          <ul className={styles.list}>
            {noteItems.map((note) => (
              <li key={note.index} className={styles.note} data-warn={note.warn === true}>
                <span className={styles.index} aria-hidden="true">
                  {note.index}
                </span>
                <div className={styles.noteBody}>
                  <span className={`label ${styles.noteLabel}`}>{note.label}</span>
                  <p className={styles.noteText}>{note.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.smallprint}>{notes.smallprint}</p>
        </div>

        <figure className={styles.figure}>
          <Photo
            name="stop-three"
            alt="Matt and Helen holding two takeaway coffees"
            sizes="(min-width: 1180px) 566px, (min-width: 660px) 45vw, calc(100vw - 2 * clamp(20px, 5vw, 64px))"
            className={styles.photo}
          />
          <figcaption className={`label ${styles.caption}`}>{notes.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
