import { useCallback, useState } from "react";
import useStyles from "styles";

/**
 * @param {{
 * size: number;
 * containerClassName: string;
 * } & React.InputHTMLAttributes<HTMLInputElement>} param0
 */

export default function Checkbox({ size, containerClassName, checked: initialCheckedState, onChange, ...otherProps }) {
  const styles = useStyles({ size });
  const [checked, setChecked] = useState(() =>
    typeof initialCheckedState === "boolean" ? initialCheckedState : false
  );

  const _onChange = useCallback(
    (e) => {
      setChecked((c) => !c);
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <div className={`${styles.root} ${containerClassName} ${checked ? "checked" : ""}`}>
      <input type="checkbox" checked={checked} onChange={_onChange} {...otherProps} />
      {checked && (
        <div className={styles.checked}>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
}
