import { showPopup } from "helper";
import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useStyles from "styles";

/**
 * @param {{
 * trigger: import("react").ReactNode;
 * className: string;
 * style: import("react").CSSProperties
 * content: import("react").ReactNode;
 * position: import("types").PopupPosition;
 * delay: number;
 * offset: number;
 * showTooltipAtMouseCursor: boolean;
 * inverted: boolean;
 * }} param0
 */
export default function Popup({
  trigger,
  className,
  style,
  content,
  position = "top center",
  delay = 0,
  offset = 10,
  showTooltipAtMouseCursor = false,
  inverted,
}) {
  const [setup, setSetup] = useState(false);
  const [mouseEvent, setMouseEvent] = useState(/** @type {MouseEvent} */ (null));
  const targetRef = useRef(/** @type {HTMLElement} */ (null));
  const popupRef = useRef(/** @type {HTMLElement} */ (null));
  const styles = useStyles({ inverted });

  const onMouseEnter = useCallback((/** @type {MouseEvent} */ e) => setMouseEvent(e), []);
  const onMouseLeave = useCallback(() => setMouseEvent(null), []);

  const _trigger = useMemo(
    () => cloneElement(trigger, { onMouseEnter, onMouseLeave, ref: targetRef }),
    [trigger, onMouseEnter, onMouseLeave]
  );

  useEffect(() => {
    if (!document.getElementById("popup-root")) {
      const div = document.createElement("div");
      div.id = "popup-root";
      document.body.appendChild(div);

      setSetup(true);

      return () => div.remove();
    }
  }, []);

  useEffect(() => {
    if (!mouseEvent) return;

    const target = targetRef.current;
    const popup = popupRef.current;

    const timeout = showPopup(target, popup, position, mouseEvent, delay, showTooltipAtMouseCursor, offset);

    if (timeout) return () => clearTimeout(timeout);
  }, [mouseEvent, delay, position, showTooltipAtMouseCursor, offset]);

  return setup ? (
    <>
      {mouseEvent
        ? createPortal(
            <div ref={popupRef} className={`${styles.popup} ${className ? className : ""}`} style={style}>
              {content}
            </div>,

            document.getElementById("popup-root")
          )
        : null}

      {_trigger}
    </>
  ) : null;
}
