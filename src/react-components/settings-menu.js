import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import StateLink from "./state-link.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";

import styles from "../assets/stylesheets/settings-menu.scss";

export default class SettingsMenu extends Component {
  static propTypes = {
    history: PropTypes.object,
    mediaSearchStore: PropTypes.object,
    hubScene: PropTypes.object,
    hubChannel: PropTypes.object
  };

  render() {
    const rowClasses = classNames([styles.row, styles.settingsRow]);
    const rowHeader = classNames([styles.row, styles.settingsRow, styles.rowHeader]);
    const showRoomSettings = !!this.props.hubChannel.permissions.update_hub;
    const showRoomInfo = !!this.props.hubScene;
    const showRoomSection = showRoomSettings || showRoomInfo;

    // Draw self first
    return (
      <div className={styles.settingsMenu}>
        <div className={styles.attachPoint} />
        <div className={styles.contents}>
          <div className={styles.rows}>
            <div className={rowHeader}>
              <FormattedMessage id="settings.row-profile" />
            </div>
            <div className={rowClasses}>
              <div className={styles.icon}>
                <img src="../assets/images/change_avatar.svg" />
              </div>
              <div className={styles.listItem}>
                <StateLink stateKey="overlay" stateValue="profile" history={this.props.history}>
                  <FormattedMessage id="settings.change-avatar" />
                </StateLink>
              </div>
            </div>
            {showRoomSection && (
              <div className={rowHeader}>
                <FormattedMessage id="settings.row-room" />
              </div>
            )}
            {showRoomSettings && (
              <div className={rowClasses}>
                <div className={styles.icon}>
                  <i>
                    <FontAwesomeIcon icon={faImage} />
                  </i>
                </div>
                <div className={styles.listItem}>
                  <div
                    className={styles.listItemLink}
                    onClick={() => this.props.mediaSearchStore.sourceNavigate("scenes", true)}
                  >
                    <FormattedMessage id="settings.change-scene" />
                  </div>
                </div>
              </div>
            )}
            {showRoomSettings && (
              <div className={rowClasses}>
                <div className={styles.icon}>
                  <i>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </i>
                </div>
                <div className={styles.listItem}>
                  <StateLink stateKey="modal" stateValue="rename_room" history={this.props.history}>
                    <FormattedMessage id="settings.rename-room" />
                  </StateLink>
                </div>
              </div>
            )}
            {showRoomInfo && (
              <div className={rowClasses}>
                <div className={styles.icon}>
                  <i>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </i>
                </div>
                <div className={styles.listItem}>
                  <StateLink stateKey="modal" stateValue="info" history={this.props.history}>
                    <FormattedMessage id="settings.room-info" />
                  </StateLink>
                </div>
              </div>
            )}
            <div className={classNames([styles.bottomLinks])}>
              <a
                className={classNames([styles.bottomLink, styles.bottomLinkMain])}
                href="https://github.com/mozilla/hubs/wiki/Hubs-Features"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="settings.features" />
              </a>
              <a
                className={classNames([styles.bottomLink, styles.bottomLinkMain])}
                href="https://github.com/mozilla/hubs/wiki/Hubs-Controls"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="settings.controls" />
              </a>
              <a
                className={classNames([styles.bottomLink, styles.bottomLinkMain])}
                href="https://discord.gg/wHmY4nd"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="settings.community" />
              </a>
              <a className={styles.bottomLink} href="/?report" target="_blank" rel="noreferrer noopener">
                <FormattedMessage id="settings.report" />
              </a>
              <a
                className={styles.bottomLink}
                href="https://github.com/mozilla/hubs/blob/master/TERMS.md"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="settings.terms" />
              </a>
              <a
                className={styles.bottomLink}
                href="https://github.com/mozilla/hubs/blob/master/PRIVACY.md"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="settings.privacy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
