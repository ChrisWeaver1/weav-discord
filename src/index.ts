
export { Pager, PagingOptions } from './helpers/pager'
export { Router } from './helpers/router'

import { Message, Client, StreamDispatcher } from 'discord.js'

/**
 * @interface Route
 * @description 
 * Properties of a route. 
 * Ensures we can make decisions based on the properties implemented via this interface.
 * @var {String} name - name of route
 * @var {Function} controller - function to be executed on match
 * @var {Array<String>} alias - Array of alias' to match on
 * @var {iRoute[]} children - Child routes
 * @var {Boolean} default - is this the default child route?
 */
export interface Route {
	name: String,
	controller?: RouteController,
	alias: String[],
    children?: Route[],
    default?: Boolean,
}

/**
 * @interface RouteController
 * 
 * @description
 * RouteController defines arguments taken by controllers
 */
export interface RouteController {
	(Args: String[], MessageRequest: Message, Client: Client): void,
}

export interface PlayerResult {
	type? : Boolean;
	message: String;
	guildentry: QueueEntry;
	payload?: any;
}

/**
 * @class
 * @name PlayerOptions
 * @description 
 * Outlines the options that can be passed into the player.
 * At a later date this will help allow volume and other settings per guild.
 * As of now it just contains the URL of the Youtube video 
 */
export class PlayerOptions {
    url?: string;
    volume?: number;
}

/**
 * @interface
 * @name QueueEntry
 * @description 
 * Stores playback details needed per guild
 * Will also contain settings in the future
 */
export interface QueueEntry {
    guild: String;
    queue: VideoLink[];
    dispatcher?: StreamDispatcher;
    settings?: PlayerOptions;
}

/**
 * @interface
 * @name VideoLink
 * @description
 * Stores details about the linked youtube video
 * Again I plan to expand this at a later date.
 */
interface VideoLink {
    url: String;
    title: String;
}

/**
 * @enum
 * @name PlayerAction
 * @description
 * Stores each of the actions the player function can perform with a request
 */
export enum PlayerAction {
    play,
    stop,
    add, 
    skip,
    queue, 
    clear
}