import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import ColorPicker from './components/ColorPicker';
import { IColorPickerProps } from './components/ColorPicker';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

export interface ColorPickerInternalProps extends  IPropertyPaneCustomFieldProps {
    onRender: any;
    label: string;
    color: string;
    onColorChanged: (color: string) => void;
}

export class ColorPickerProperty implements IPropertyPaneField<ColorPickerInternalProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: ColorPickerInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: ColorPickerInternalProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.key,
            label: properties.label,
            color: properties.color,
            onColorChanged: properties.onColorChanged,
            onRender: this.onRender.bind(this)
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<IColorPickerProps> = React.createElement(ColorPicker, {
            key: this.properties.key,
            label: this.properties.label,
            color: this.properties.color,
            onColorChanged: this.properties.onColorChanged
       });
        ReactDom.render(element, elem);
    }

}