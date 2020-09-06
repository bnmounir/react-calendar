import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import ErrorMessage from './errorMessage';
import './styles.css';

function CreateEventForm() {
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting },
    } = useForm();
    const [selectedDate, handleDateChange] = React.useState(new Date());

    const colourOptions = [
        { value: 'red', label: 'Red', name: 'red' },
        { value: 'yellow', label: 'Yellow', name: 'yellow' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
    ];

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <div className='container'>
            <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                <h1>Create Event</h1>
                <label>Title:</label>
                <input name='title' ref={register({ required: true })} />
                <ErrorMessage error={errors.title} />
                <label>Range:</label>
                <input
                    name='range'
                    defaultValue='range passed on props'
                    ref={register({ required: true })}
                />
                <ErrorMessage error={errors.range} />
                <label>Range:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
                <label>Color</label>
                <Select
                    ref={register({ required: true })}
                    className='basic-single'
                    classNamePrefix='select'
                    isClearable={true}
                    isSearchable={true}
                    name='colors'
                    options={colourOptions}
                    defaultValue='blue'
                />
                <ErrorMessage error={errors.color} />
                <input disabled={isSubmitting} type='submit' />
            </form>
        </div>
    );
}

export default CreateEventForm;
