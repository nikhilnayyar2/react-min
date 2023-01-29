import { showPopup } from "./helper";
import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useStyles from "./styles";

/**
 * @param {{
 * trigger: import("react").ReactNode;
 * className: string;
 * style: import("react").CSSProperties
 * content: import("react").ReactNode;
 * position: import("types").PopupPosition;
 * mouseEnterDelay: number;
 * mouseLeaveDelay: number;
 * offset: number;
 * showPopupAtMouseCursor: boolean;
 * inverted: boolean;
 * }} param0
 */
export default function Popup({
  trigger,
  className,
  style,
  content,
  position = "top center",
  mouseEnterDelay,
  mouseLeaveDelay,
  offset = 10,
  showPopupAtMouseCursor = false,
  inverted,
}) {
  const [setup, setSetup] = useState(false);
  const [mouseEvent, setMouseEvent] = useState(/** @type {MouseEvent} */ (null));
  const targetRef = useRef(/** @type {HTMLElement} */ (null));
  const popupRef = useRef(/** @type {HTMLElement} */ (null));
  const styles = useStyles({ inverted });
  const mouseEnterDelayTimeoutRef = useRef(null);
  const mouseLeaveDelayTimeoutRef = useRef(null);

  const onMouseEnter = useCallback((/** @type {MouseEvent} */ e) => {
    if (mouseLeaveDelayTimeoutRef.current) clearTimeout(mouseLeaveDelayTimeoutRef.current);
    else setMouseEvent(e);
  }, []);

  const onMouseLeave = useCallback(() => {
    if (mouseLeaveDelay && !mouseEnterDelayTimeoutRef.current)
      mouseLeaveDelayTimeoutRef.current = setTimeout(() => {
        mouseLeaveDelayTimeoutRef.current = null;
        setMouseEvent(null);
      }, mouseLeaveDelay);
    else {
      setMouseEvent(null);

      if (mouseEnterDelayTimeoutRef.current) {
        clearTimeout(mouseEnterDelayTimeoutRef.current);
        mouseEnterDelayTimeoutRef.current = null;
      }
    }
  }, [mouseLeaveDelay]);

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

    setSetup(true);
  }, []);

  useEffect(() => {
    if (!mouseEvent) return;

    const target = targetRef.current;
    const popup = popupRef.current;
    const callback = () => {
      showPopup(target, popup, position, mouseEvent, showPopupAtMouseCursor, offset);
      mouseEnterDelayTimeoutRef.current = null;
    };

    if (mouseEnterDelay) mouseEnterDelayTimeoutRef.current = setTimeout(callback, mouseEnterDelay);
    else callback();
  }, [mouseEvent, mouseEnterDelay, position, showPopupAtMouseCursor, offset]);

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
