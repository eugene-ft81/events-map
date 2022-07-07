import * as InitialViewStates from './nav-targets';

import styles from './nav.css';

export default function Nav ({onChange}) {
    return (
        <div className={styles.controls}>
            {Object.keys(InitialViewStates).map(target => (
                <button key={target} 
                    onClick={() => onChange(InitialViewStates[target])}
                >
                    {target}
                </button>
            ))}
        </div>
    );
}