export class SingleActionButtonSystem {
  tick() {
    this.didInteractThisFrame = false;
    const interaction = AFRAME.scenes[0].systems.interaction;
    const userinput = AFRAME.scenes[0].systems.userinput;
    const hovered = interaction.state.rightRemote.hovered;
    if (
      hovered &&
      userinput.get(interaction.options.rightRemote.grabPath) &&
      hovered.components.tags &&
      hovered.components.tags.data.singleActionButton
    ) {
      this.didInteractThisFrame = true;
      hovered.object3D.dispatchEvent({
        type: "interact",
        object3D: interaction.options.rightRemote.entity.object3D
      });
    }
  }
}

export class HoldableButtonSystem {
  tick() {
    const interaction = AFRAME.scenes[0].systems.interaction;
    const held = interaction.state.rightRemote.held;

    if (this.prevHeld && this.prevHeld !== held) {
      this.prevHeld.object3D.dispatchEvent({
        type: "holdable-button-up",
        object3D: interaction.options.rightRemote.entity.object3D
      });
    }
    if (held && this.prevHeld !== held) {
      held.object3D.dispatchEvent({
        type: "holdable-button-down",
        object3D: interaction.options.rightRemote.entity.object3D
      });
    }

    this.prevHeld = held;
  }
}

function getHoverableButton(hovered) {
  if (!hovered) return null;
  if (
    hovered.components["icon-button"] ||
    hovered.components["text-button"] ||
    hovered.components["pin-networked-object-button"] ||
    hovered.components["open-media-button"]
  )
    return hovered;
  // TODO: fix this so that we aren't looping thru children here. I just did this to accomodate the new rounded buttons
  if (hovered.children) {
    for (let i = 0; i < hovered.children.length; i++) {
      if (
        hovered.children[i].components["icon-button"] ||
        hovered.children[i].components["text-button"] ||
        hovered.components["pin-networked-object-button"]
      ) {
        return hovered.children[i];
      }
    }
  }
  return null;
}
const HOVERED = { type: "hovered" };
const UNHOVERED = { type: "unhovered" };
export class HoverButtonSystem {
  tick() {
    const interaction = AFRAME.scenes[0].systems.interaction;
    const button = getHoverableButton(interaction.state.rightRemote.hovered);

    if (this.prevButton && this.prevButton !== button) {
      this.prevButton.object3D.dispatchEvent(UNHOVERED);
    }

    if (button && this.prevButton !== button) {
      button.object3D.dispatchEvent(HOVERED);
    }

    this.prevButton = button;
  }
}
