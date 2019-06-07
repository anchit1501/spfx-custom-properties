import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { update } from "@microsoft/sp-lodash-subset";
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ColorPickerWebPartStrings';
import ColorPicker1 from './components/ColorPicker';
import { ColorPickerProperty } from "../../propertyPanes/ColorPicker/ColorPicker";
import { IColorPickerProps } from './components/IColorPickerProps';

export interface IColorPickerWebPartProps {
  description: string;
  color: string;
  onColorChanged: (color: string) => void;
  colorChanged: (color: string) => void;
}

export default class ColorPickerWebPart extends BaseClientSideWebPart<IColorPickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IColorPickerProps > = React.createElement(
      ColorPicker1,
      {
        description: this.properties.description,
        color: this.properties.color,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }


  protected onColorChange(color: any) {
    update(
      this.properties,
      "color",
      (): any => {
        return color;
      }
    );
    this.render();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                new ColorPickerProperty("color", {
                  key: "COLOR PICKER",
                  label: "COLOR PICKER",
                  color: this.properties.color,
                  onColorChanged: this.onColorChange.bind(this),
                  onRender: this.render.bind(this)
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
