import React, { ChangeEvent } from 'react';
interface ISelectProps {
    handleChange(value: any): void
    count: number
}

const SelectOption = ({ count, handleChange }: ISelectProps): JSX.Element => {
    const onChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const { value } = event.target;
        handleChange(parseInt(value))
      };
        return (
            <label>
                Pick number of player:
                <select value={count} onChange={onChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                </select>
            </label>   
        );
}

export default SelectOption;