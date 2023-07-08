// ==========================================================================
// 1. Parameters
// --------------------------------------------------------------------------
const NBR_CANVAS_WIDTH = 8000;
const NBR_CANVAS_HEIGHT = 20000;
// --------------------------------------------------------------------------
const NBR_PARTICLE_AMOUNT = 80;
const NBR_PARTICLE_DEPTH_OFFSET = 0;
const NBR_PARTICLE_WIDTH_MIN = 22000;
const NBR_PARTICLE_WIDTH_MAX = 24000;
const NBR_PARTICLE_WIDTH_STEP = 2;
const NBR_PARTICLE_HEIGHT_MIN = 2;
const NBR_PARTICLE_HEIGHT_MAX = 3;
const NBR_PARTICLE_HEIGHT_STEP = 1;
// --------------------------------------------------------------------------
const NBR_PARTICLE_BORDER_RADIUS_MIN = 0;
const NBR_PARTICLE_BORDER_RADIUS_MAX = 0;
const NBR_PARTICLE_BORDER_WIDTH_MIN = 0;
const NBR_PARTICLE_BORDER_WIDTH_MAX = 0;
const STR_PARTICLE_BORDER_STYLE = "solid";
const STR_PARTICLE_BORDER_COLOR = "#e6e6e6";
const ARR_PARTICLE_BG_COLOR = ["#808080"];
const NBR_PARTICLE_OPACITY_MIN = 0.15;
const NBR_PARTICLE_OPACITY_MAX = 0.20;
// --------------------------------------------------------------------------
const BOOL_PARTICLE_HAS_SIDES_EQUAL = false;
const BOOL_PARTICLE_IS_ROUNDED = false;
const BOOL_PARTICLE_IS_BORDERLESS = true;
const BOOL_PARTICLE_IS_OPAQUE = false;
const BOOL_PARTICLE_IS_AT_TOP = false;
const BOOL_PARTICLE_IS_AT_LEFT = true;
// ==========================================================================
// 2. Background
// --------------------------------------------------------------------------
const elemBody = document.body;
elemBody.style.position = "relative";
// --------------------------------------------------------------------------
const elemBGContainer = document.createElement("div");
elemBody.appendChild(elemBGContainer);
// --------------------------------------------------------------------------
elemBGContainer.style.position = "absolute";
elemBGContainer.style.inset = "0px";
elemBGContainer.style.zIndex = "-1000";
elemBGContainer.style.overflow = "hidden";
elemBGContainer.style.pointerEvents = "none";
elemBGContainer.style.userSelect = "none";
// --------------------------------------------------------------------------
elemBGContainer.tabIndex = "-1";
elemBGContainer.ariaDisabled = "true";
// --------------------------------------------------------------------------
const randomizeMinMaxStep = (nbrMin, nbrMax, nbrStep) => {
    if (nbrStep <= 0) {
        return nbrMin;
    } else if (nbrStep === 1) {
        return Math.random() < 0.5 ? nbrMin : nbrMax;
    } else {
        nbrStep = Math.min(nbrStep, 100);
        return nbrMin + Math.trunc(
            Math.round(Math.random() * nbrStep) / nbrStep *
            100
        ) / 100 * (nbrMax - nbrMin);
    }
}
// --------------------------------------------------------------------------
let arrParticle = [];
// --------------------------------------------------------------------------
for (let i = 0; i < NBR_PARTICLE_AMOUNT; i++) {
    let elemParticle = document.createElement("div");
    elemParticle.style.position = "absolute";
    elemParticle.style.width = `${
		Math.round(
			randomizeMinMaxStep(
				NBR_PARTICLE_WIDTH_MIN, 
				NBR_PARTICLE_WIDTH_MAX, 
				NBR_PARTICLE_WIDTH_STEP
			) + 
			i / NBR_PARTICLE_AMOUNT * NBR_PARTICLE_DEPTH_OFFSET * 
			(NBR_PARTICLE_WIDTH_MAX - NBR_PARTICLE_WIDTH_MIN) / 
			(
				NBR_PARTICLE_WIDTH_MAX - NBR_PARTICLE_WIDTH_MIN + 
				NBR_PARTICLE_HEIGHT_MAX - NBR_PARTICLE_HEIGHT_MIN
			)
		)
	}px`;
    elemParticle.style.height = BOOL_PARTICLE_HAS_SIDES_EQUAL ?
        elemParticle.style.width :
        `${
			Math.round(
				randomizeMinMaxStep(
					NBR_PARTICLE_HEIGHT_MIN, 
					NBR_PARTICLE_HEIGHT_MAX, 
					NBR_PARTICLE_HEIGHT_STEP
				) + 
				i / NBR_PARTICLE_AMOUNT * NBR_PARTICLE_DEPTH_OFFSET * 
				(NBR_PARTICLE_HEIGHT_MAX - NBR_PARTICLE_HEIGHT_MIN) / 
				(
					NBR_PARTICLE_WIDTH_MAX - NBR_PARTICLE_WIDTH_MIN + 
					NBR_PARTICLE_HEIGHT_MAX - NBR_PARTICLE_HEIGHT_MIN
				)
			)
		}px`;
    elemParticle.style.backgroundColor = ARR_PARTICLE_BG_COLOR[
        Math.round(
            Math.random() * (ARR_PARTICLE_BG_COLOR.length - 1)
        )
    ];
    elemParticle.style.borderWidth = `${BOOL_PARTICLE_IS_BORDERLESS ? 
			0 : 
			Math.round(
				NBR_PARTICLE_BORDER_WIDTH_MIN + 
				i / NBR_PARTICLE_AMOUNT * 
				(NBR_PARTICLE_BORDER_WIDTH_MAX - NBR_PARTICLE_BORDER_WIDTH_MIN)
			)
	}px`;
    elemParticle.style.borderStyle = STR_PARTICLE_BORDER_STYLE;
    elemParticle.style.borderColor = STR_PARTICLE_BORDER_COLOR;
    elemParticle.style.borderRadius = `${BOOL_PARTICLE_IS_ROUNDED ? 
			(
				Math.max(NBR_PARTICLE_WIDTH_MAX, NBR_PARTICLE_HEIGHT_MAX) + 
				NBR_PARTICLE_DEPTH_OFFSET
			) / 2 : 
			Math.round(
				i / NBR_PARTICLE_AMOUNT * 
				(NBR_PARTICLE_BORDER_RADIUS_MAX - NBR_PARTICLE_BORDER_RADIUS_MIN) + 
				NBR_PARTICLE_BORDER_RADIUS_MIN
			)
	}px`;
    elemParticle.style.opacity = `${BOOL_PARTICLE_IS_OPAQUE ? 
			1 : 
			Math.trunc(
				(
					i / NBR_PARTICLE_AMOUNT * 
					(NBR_PARTICLE_OPACITY_MAX - NBR_PARTICLE_OPACITY_MIN) + 
					NBR_PARTICLE_OPACITY_MIN) * 
				100
			) / 100
	}`;
    elemParticle.style.top = `${BOOL_PARTICLE_IS_AT_TOP ? 
			0 : 
			Math.round(NBR_CANVAS_HEIGHT*Math.random())
	}px`;
    elemParticle.style.left = `${BOOL_PARTICLE_IS_AT_LEFT ? 
			0 : 
			Math.round(NBR_CANVAS_WIDTH*Math.random())
	}px`;
    arrParticle.push(elemParticle);
}
// --------------------------------------------------------------------------
for (const elemParticle of arrParticle) {
    elemBGContainer.appendChild(elemParticle);
}
// ==========================================================================
// 3. GSAP Animation
// --------------------------------------------------------------------------
if (!!gsap) {
    console.log(`GSAP \t\t ${gsap.version}`);
    gsap.set(
        arrParticle, {
            transformOrigin: "top left",
            skewY: -72,
        }
    );
    gsap.to(
        arrParticle, {
            x: "random(-100, 100, 10)",
            opacity: "+=0.10",
            repeat: -1,
            repeatRefresh: true,
            duration: 10,
            yoyo: true,
            ease: "power1.inOut",
        }
    );
} else {
    console.log("GSAP \t\t ERROR");
}
// ==========================================================================
// 4. Bootstrap Plugins
// --------------------------------------------------------------------------
if (!!bootstrap) {
    console.log(`Bootstrap \t ${bootstrap.Alert.VERSION}`);
} else {
    console.log("Bootstrap \t ERROR");
}
