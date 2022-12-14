import * as yamjs from 'yamljs';
import * as fs from 'fs';
import {parse} from 'path';
import {load} from "yamljs";

type typeConfig = 'json' | 'yaml' | "ini" | "txt";

export default class Config {
    private readonly filename: string;
    private config: object = {};
    private readonly typeConfig: typeConfig;
    private readonly defaults: object;
    private nestedCache: object = {};
    private changed: boolean;

    constructor(filename: string, typeConfig: typeConfig = "yaml", defaults: object = {}) {
        this.defaults = defaults;
        this.typeConfig = typeConfig;
        this.load(this.filename = filename.replace( new RegExp("/", "g"),"\\"));
    }

    public get(key: string, value: any = undefined): any {
        return this.config[key] ?? value;
    }

    public getAll(entry: boolean = false, key: boolean = false): [string, any][]|string[]|{} {
        return entry ? Object.entries(this.config ?? {}) : (key ? Object.keys(this.config ?? {}) : this.config);
    }

    public setAll(values: object) {
        this.config = values;
    }

    public has(key: string){
        return this.config[key] !== undefined;
    }

    public set(key: string, value: any): void {
        this.config[key] = value;
    }

    public remove(key: string): void {
        if (!this.has(key)) return;
        delete(this.config[key]);
    }

    public getFileName(): string{
        return this.filename;
    }

    public reload(): void {
        this.config = {};
        this.nestedCache = {};
        this.load(this.filename);
    }

    public setNested(key: string, value){
        const vars: string[] = key.split(".");
        let base = vars.shift();

        if (!this.isLiteralObject(this.config)){
            this.config = {};
        }
        if(this.config[base] === undefined){
            this.config[base] = {};
        }

        base = this.config[base];
        while(vars.length > 0){
            let baseKey = vars.shift();
            if(base[baseKey] === undefined){
                base[baseKey] = {};
            }
            if (vars.length === 0) {
                base[baseKey] = value;
            }else {
                base = base[baseKey];
            }

        }
        this.nestedCache = {};
    }

    /**
     *
     * @return mixed
     * @param key
     * @param defaults
     */
    public getNested(key: string, defaults: any = undefined){
        if(this.nestedCache[key] != undefined){
            return this.nestedCache[key];
        }

        const vars: string[] = key.split(".");
        let base: any = vars.shift();
        if (!this.isLiteralObject(this.config)){
            this.config = {};
        }
        if(this.config[base] !== undefined){
            base = this.config[base];
        }else{
            return defaults;
        }

        while(vars.length > 0){
            let baseKey = vars.shift();
            if(this.isLiteralObject(base) && base[baseKey]){
                base = base[baseKey];
            }else{
                return defaults;
            }
        }

        return this.nestedCache[key] = base;
    }


    public  removeNested(key: string) : void {
        this.nestedCache = [];
        this.changed = true;

        const vars: string[] = key.split(".");

        let currentNode = this.config;
        while (vars.length > 0) {
            const nodeName = vars.shift();
            if (currentNode[nodeName] !== undefined) {
                if (vars.length === 0) { //final node
                    delete(currentNode[nodeName]);
                }
                if (this.isLiteralObject(currentNode[nodeName])) {
                    currentNode = currentNode[nodeName];
                }
            } else {
                break;
            }
        }
    }


    public  isLiteralObject(value) {
        return value instanceof Object && value.constructor === Object;
    }
    public load(filename: string): void {
        const path = parse(filename)
        if (!fs.existsSync(path.dir)) {
            fs.mkdirSync(path.dir, {recursive: true});
        }
        if (!fs.existsSync(filename)) {
            this.config = this.defaults;
            if (!fs.existsSync(filename)) {
                fs.writeFileSync(filename, this.defaultToString(), {encoding: "utf-8"});
            }
        }

        this.config = this.stringToConfig(filename);
    }

    public save(): void {
        fs.writeFileSync(this.filename, this.configToString(), {encoding: "utf-8"});
    }
    public stringToConfig(filename: string): any{

        let readConfig = undefined;
        switch (this.typeConfig) {
            case "yaml": {
                readConfig = yamjs.load(filename);
                break;
            }
            case "json": {
                readConfig = JSON.parse(fs.readFileSync(filename, {encoding: "utf-8"}))
                break;
            }
            default:{

                throw "no existe type config";
            }
        }
        if (readConfig === undefined){
            throw "Error Read your config";
        }
        return readConfig;
    }


    public configToString(): string{

        let writeConfig = undefined;
        switch (this.typeConfig) {
            case "yaml": {
                writeConfig = yamjs.stringify(this.config, 4);
                break;
            }
            case "json": {
                writeConfig = JSON.stringify(this.config, [], 2)
                break;
            }
            default:{
                throw "no existe type config";
            }
        }
        if (writeConfig === undefined){
            throw "Error Write your config";
        }
        return writeConfig;
    }
    public defaultToString(): string{

        let writeConfig = undefined;
        switch (this.typeConfig) {
            case "yaml": {
                writeConfig = yamjs.stringify(this.defaults, 4);
                break;
            }
            case "json": {
                writeConfig = JSON.stringify(this.defaults, [], 2)
                break;
            }
            default:{

                throw "no existe type config";
            }
        }
        if (writeConfig === undefined){
            throw "Error Write your config";
        }
        return writeConfig;
    }
}