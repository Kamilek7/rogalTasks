import { useCallback } from 'react'

export function getAutoHeight(el) {
        const clone = el.cloneNode(true);
        clone.style.height = "auto";
        clone.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.transition = "none";
        el.parentNode.appendChild(clone);
        const height = clone.scrollHeight;
        el.parentNode.removeChild(clone);
        return height;
}

export function useCSSAnimation(wysuniete, child, id) {
    const checkChildrenHeight = useCallback((parent, flag) => {
        parent.scrollHeight
        if (!wysuniete || flag) {
            requestAnimationFrame(() => {
                parent.style.height = getAutoHeight(parent) + "px";
            });
        }
        else {
            requestAnimationFrame(() => {
                parent.style.height = "0px";
            });

        }
    }, [wysuniete]);

    const applyCSS = useCallback(() => {
        let el = document.querySelector(`div[data-id='${id}']`);
        el.style.transition = 'all 0.5s ease-in-out';
        el.style.opacity = "0%";
        setTimeout(async () => {
            el.style.height = '0px';
            el.style.padding = '0px';
            el.style.margin = '0px';
            if (el.className == "taskRowChild") {
                checkChildrenHeight(el.parentElement.parentElement, true)
                el.offsetHeight;
            }
        }, 600)
    }, [checkChildrenHeight])

    const updateDiv = useCallback(() => {
        if (!child) {
            if (wysuniete) {
                let parent = document.querySelector(`div[data-id='child${id}']`);
                checkChildrenHeight(parent, true)
            }
        }
    }, [wysuniete, checkChildrenHeight])

    
    return {checkChildrenHeight, applyCSS, updateDiv}
}