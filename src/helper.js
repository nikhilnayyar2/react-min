const delta = 2;

/**
 *
 * @param {HTMLElement} target
 * @param {HTMLElement} popup
 * @param {import("types").PopupPosition} position
 * @param {MouseEvent} mouseEvent
 * @param {number} delay
 * @param {boolean} showTooltipAtMouseCursor
 * @param {number} offset
 * @returns
 */
export const showPopup = (target, popup, position, mouseEvent, delay, showTooltipAtMouseCursor, offset) => {
  const arr = position.split(" ");

  // resources
  // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  // https://github.com/google/material-design-lite/blob/mdl-1.x/src/tooltip/tooltip.js#L69
  // https://stackoverflow.com/questions/7108941/css-transform-vs-position
  // https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

  /** @type {DOMRect} */
  let targetRec;

  // handle multiline inline elements
  if (getComputedStyle(target).display === "inline") {
    const rects = target.getClientRects();

    for (let i = 0; i < rects.length; ++i) {
      if (
        rects[i].top - delta <= mouseEvent.clientY &&
        mouseEvent.clientY < rects[i].bottom + delta &&
        rects[i].left - delta <= mouseEvent.clientX &&
        mouseEvent.clientX < rects[i].right + delta
      ) {
        targetRec = rects[i];
        break;
      }
    }
  } else targetRec = target.getBoundingClientRect();

  if (showTooltipAtMouseCursor) {
    let tempX = 0;
    if (position === "top center" || position === "bottom center") tempX = targetRec.width / 2;
    else if (position === "right center") tempX = targetRec.width;

    targetRec = new DOMRect(mouseEvent.clientX - tempX, targetRec.y, targetRec.width, targetRec.height);
  }

  if (targetRec) {
    let tooltipRec = popup.getBoundingClientRect();

    let targetRecY, tooltipRecY, targetRecX, tooltipRecX;

    // 'top left' | 'top right' | 'bottom right' | 'bottom left' | 'top center' | 'bottom center'
    if (arr[0] === "top" || arr[0] === "bottom") {
      targetRecY = arr[0] === "top" ? targetRec.top : targetRec.bottom;
      tooltipRecY = arr[0] === "top" ? tooltipRec.bottom : tooltipRec.top;

      if (arr[1] === "left" || arr[1] === "right") {
        targetRecX = arr[1] === "left" ? targetRec.left : targetRec.right;
        tooltipRecX = arr[1] === "left" ? tooltipRec.left : tooltipRec.right;
      } else if (arr[1] === "center") {
        targetRecX = targetRec.left + targetRec.width / 2;
        tooltipRecX = tooltipRec.left + tooltipRec.width / 2;
      }
    }
    //  'right center' | 'left center'
    else if (arr[0] === "left" || arr[0] === "right") {
      targetRecX = arr[0] === "left" ? targetRec.left : targetRec.right;
      tooltipRecX = arr[0] === "left" ? tooltipRec.right : tooltipRec.left;

      if (arr[1] === "center") {
        targetRecY = targetRec.top + targetRec.height / 2;
        tooltipRecY = tooltipRec.top + tooltipRec.height / 2;
      }
    }
    if (targetRecY !== undefined && tooltipRec !== undefined && targetRecX !== undefined && tooltipRecX !== undefined) {
      let y = targetRecY - tooltipRecY;
      let x = targetRecX - tooltipRecX;

      /** @type {DOMRect} */
      let newTooltipRec = {
        left: tooltipRec.left + x,
        right: tooltipRec.right + x,
        top: tooltipRec.top + y,
        bottom: tooltipRec.bottom + y,
      };

      let tooltipNotClippedAlongX = false;

      // https://gomakethings.com/how-to-check-if-any-part-of-an-element-is-out-of-the-viewport-with-vanilla-js/
      if (newTooltipRec.left < 0) x = x - newTooltipRec.left;
      else if (newTooltipRec.right > window.innerWidth)
        x =
          x -
          (newTooltipRec.right - window.innerWidth) -
          /* subtract scrollbar if present */ (window.innerWidth - document.documentElement.offsetWidth);
      else tooltipNotClippedAlongX = true;

      if (newTooltipRec.top < 0) y = y + tooltipRec.height + targetRec.height;
      else if (newTooltipRec.bottom > window.innerHeight) y = y - tooltipRec.height - targetRec.height;

      // avoid popup & target (current rect) overlap along X-axis

      if (!tooltipNotClippedAlongX && (position === "left center" || position === "right center")) {
        const targetRecDistFromTop = targetRec.top,
          targetRecDistFromBottom = window.innerHeight - targetRec.bottom;

        y =
          targetRecDistFromTop > targetRecDistFromBottom
            ? y - (tooltipRec.height / 2 + targetRec.height / 2)
            : y + (tooltipRec.height / 2 + targetRec.height / 2);
      }

      /** @type {DOMRect} */
      newTooltipRec = {
        left: tooltipRec.left + x,
        right: tooltipRec.right + x,
        top: tooltipRec.top + y,
        bottom: tooltipRec.bottom + y,
      };

      // determine popup postion relative to target in order to add offset / class to popup

      const targetMidPointY = targetRec.top + targetRec.height / 2;
      let positionClass;

      // top
      if (newTooltipRec.bottom < targetMidPointY) {
        positionClass = `top ${arr[1]}`;
        y -= offset;
      }
      // bottom
      else if (newTooltipRec.top > targetMidPointY) {
        positionClass = `bottom ${arr[1]}`;
        y += offset;
      }
      // middle
      else {
        const targetMidPointX = targetRec.left + targetRec.width / 2;
        // left
        if (newTooltipRec.right < targetMidPointX) {
          positionClass = "left center";
          x -= offset;
        }
        // right
        else if (newTooltipRec.left > targetMidPointX) {
          positionClass = "right center";
          x += offset;
        }
      }

      if (positionClass) popup.className = `${popup.className} ${positionClass}`;

      return setTimeout(() => {
        popup.style.transform = `translate(${x}px,${y}px)`;
        popup.style.opacity = "1";
      }, delay);
    }
  }
};
