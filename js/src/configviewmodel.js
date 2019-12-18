/*
 * μlogger
 *
 * Copyright(C) 2019 Bartek Fabiszewski (www.fabiszewski.net)
 *
 * This is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

import { config, lang } from './initializer.js';
import ViewModel from './viewmodel.js';
import uUtils from './utils.js';

/**
 * @class ConfigViewModel
 */
export default class ConfigViewModel extends ViewModel {
  /**
   * @param {uState} state
   */
  constructor(state) {
    super(config);
    this.state = state;
    this.model.onSetInterval = () => this.setAutoReloadInterval();
  }

  init() {
    this.setObservers();
    this.bindAll();
  }

  setObservers() {
    this.onChanged('mapApi', (api) => {
      uUtils.setCookie('api', api);
    });
    this.onChanged('lang', (_lang) => {
      uUtils.setCookie('lang', _lang);
      ConfigViewModel.reload();
    });
    this.onChanged('units', (units) => {
      uUtils.setCookie('units', units);
      ConfigViewModel.reload();
    });
    this.onChanged('interval', (interval) => {
      uUtils.setCookie('interval', interval);
    });
  }

  static reload() {
    window.location.reload();
  }

  setAutoReloadInterval() {
    const interval = parseInt(prompt(lang.strings['newinterval']));
    if (!isNaN(interval) && interval !== this.model.interval) {
      this.model.interval = interval;
    }
  }
}