/**
 * GaiaPHR (Patient Health Records)
 * Copyright (C) 2013 Certun, inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('App.controller.Abstract', {
    extend: 'Ext.app.Controller',

    getMain: function() {
        return Ext.ComponentQuery.query('container[action=appMain]')[0];
    },

    getHeader: function() {
        return this.getMain().down('appHeader');
    },

    getCenter: function() {
        return this.getMain().down('appCenter');
    },

    getWest: function() {
        return this.getMain().down('appWest');
    },

    getFooter: function() {
        return this.getMain().down('appFooter');
    },

    getNavigation: function() {
        return this.getWest().down('treepanel');
    },

    getClass: function(cls) {
        if (Ext.ClassManager.isCreated(cls)) {
            return Ext.ClassManager.get(cls);
        } else {
            return false;
        }
    },

    getModule: function(module) {
        return this.getClass('App.module.' + module + '.Main');
    },

    flyMsg: function(title, format, error, persistent) {
        var msgBgCls = (error === true) ? 'msg-red' : 'msg-green';
        
    this.msgCt = Ext.get('msg-div');
        this.msgCt.alignTo(document, 't-t');
        
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)),
            m = Ext.core.DomHelper.append(this.msgCt, {
                html: '<div class="flyMsg ' + msgBgCls + '"><h3>' + (title || '') + '</h3><p>' + s + '</p></div>'
            }, true);

        // if persitent return the message element without the fade animation
        if (persistent === true) return m;
        
        m.addCls('fadeded');
        Ext.create('Ext.fx.Animator', {
            target: m,
            duration: error ? 7000 : 2000,
            keyframes: {
                0: {
                    opacity: 0
                },
                20: {
                    opacity: 1
                },
                80: {
                    opacity: 1
                },
                100: {
                    opacity: 0,
                    height: 0
                }
            },
            listeners: {
                afteranimate: function() {
                    m.destroy();
                }
            }
        });
        return true;
    },

    startCron: function () {
        App.cron = Ext.TaskManager.start({
            run: function () {
                Cron.Run({ jobs: ['ckAuth', 'get'] }, function () {

                });
            },
            interval: 1000 * 60 * 1
        });
    },

    stopCron:function(){
        App.cron.destroy();
    }

});
