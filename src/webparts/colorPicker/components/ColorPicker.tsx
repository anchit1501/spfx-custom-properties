import * as React from 'react';
import styles from './ColorPicker.module.scss';
import { IColorPickerProps } from './IColorPickerProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ColorPicker1 extends React.Component<IColorPickerProps, {}> {
  public render(): React.ReactElement<IColorPickerProps> {
    return (
      <div className={ styles.colorPicker }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
                {this.props.color}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
