import { Box, Button, Heading, Select, Stack } from "@chakra-ui/react"
import { BellIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons/dist/ChevronDown";
const comedy = require("../music_tone/comedy.mp3")
const flute_tone = require("../music_tone/flute_tone.mp3")
const instrumental = require("../music_tone/instrumental_tone.mp3")


function Timer() {
    const time = new Date()
    let day: string = time.getDay().toString()
    const hours: number = time.getHours()
    const minute: number = time.getMinutes()
    const second: number = time.getSeconds()

    switch (day) {
        case '0': {
            day = 'Sunday';
            break;
        }

        case '1': {
            day = 'Monday';
            break;
        }

        case '2': {
            day = 'Tuesday';
            break;
        }

        case '3': {
            day = 'Wednesday';
            break;
        }

        case '4': {
            day = 'Thursday';
            break;
        }

        case '5': {
            day = 'Friday';
            break;
        }

        case '6': {
            day = 'Saturday';
            break;
        }

        default: {
            return { day, hours, minute, second }
        }

    }

    return { day, hours, minute, second }
}

interface alarm {
    hours: number,
    minute: number,
    timeZone: string,
    tone: string
}

const initAlarm = {
    hours: 0,
    minute: 0,
    timeZone: '',
    tone: ''
}

const hourChange = (val: number) => {

    switch (val) {
        case 13: {
            val = 1;
            break;
        }
        case 14: {
            val = 2;
            break;
        }
        case 15: {
            val = 3;
            break;
        }
        case 16: {
            val = 4;
            break;
        }
        case 17: {
            val = 5;
            break;
        }
        case 18: {
            val = 6;
            break;
        }
        case 19: {
            val = 7;
            break;
        }
        case 20: {
            val = 8;
            break;
        }
        case 21: {
            val = 9;
            break;
        }
        case 22: {
            val = 10;
            break;
        }
        case 23: {
            val = 11;
            break;
        }
        case 24: {
            val = 12;
            break;
        }
    }

    if (val < 10) {
        return `0${val}`
    } else {
        return val
    }

}


const ValChange = (val: number) => {


    if (val < 10) {
        return `0${val}`
    } else {
        return val
    }

}



export const DigitalClock = () => {

    const [state, setState] = useState(Timer())
    const alarmTime = localStorage.getItem('alarmTime') || {}
    let check : any;

    if (typeof alarmTime === 'string') {
        check = JSON.parse(alarmTime)
    }

    const [alarm, setAlarm] = useState<alarm>(initAlarm)

    useEffect(() => {
        setInterval(() => {
            setState(() => Timer())
        }, 1000)
    }, [])



    const timeHour = []
    const timeSecond = []

    for (let i = 0; i < 12; i++) {
        if (i < 9) {
            timeHour.push(`0${i + 1}`)
        } else {
            timeHour.push(i + 1)
        }
    }

    for (let i = 0; i < 60; i++) {
        if (i <= 9) {
            timeSecond.push(`0${i}`)
        } else {
            timeSecond.push(i)
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setAlarm({
            ...alarm,
            [name]: value
        })


    }

    const setHandleAlarm = () => {
        localStorage.setItem('alarmTime', JSON.stringify(alarm))
        setAlarm(initAlarm)


    }

    const timeZone = (val: number) => {

        if (val >= 12) {
            return 'PM'
        } else {
            return 'AM'
        }

    }

    useEffect(() => {

        if (check !== undefined) {

            if (check.hours == hourChange(state.hours) && check.minute == ValChange(state.minute) && check.timeZone == timeZone(state.hours)) {
    
                if (check.tone === 'instrumental') {
                    const flute_audio = new Audio(instrumental)
    
                    flute_audio.play()

                } else if (check.tone === 'comedy') {
                    const comedy_audio = new Audio(comedy)
                    console.log(comedy_audio)


                    comedy_audio.play()
                } else if(check.tone === 'flute') {
    
                    const flute = new Audio(flute_tone)
    
                    flute.play()
    
                }
    
            }
    
        }
        // console.log('world')

    } , [state.minute])

    return (
        <Box backgroundColor={'black'} >
            <Box w={{base : '90%'}} m='auto' py='10%'>
                <Box>
                    <Heading color={'white'}>{state.day.toUpperCase()}</Heading>
                    <Heading fontFamily={'sans-serif'} color={'white'}>{hourChange(state.hours)} : {ValChange(state.minute)} : {ValChange(state.second)} {state.hours >= 12 ? 'PM' : 'AM'}</Heading>
                </Box>
                <Box w='50%' m='auto' p='3%'>
                    <Stack direction={{ base : 'column' , sm : 'row' , md : 'row' , lg : 'row'}}>
                        <Select onChange={handleChange} variant='filled' name="hours" id="" placeholder="Select Hour">
                            {
                                timeHour.map((i) => (
                                    <option color="black" value={i}>{i}</option>
                                ))
                            }
                        </Select>
                        <Select onChange={handleChange} variant='filled' name="minute" id="" placeholder="Select Minute">
                            {
                                timeSecond.map((i) => (
                                    <option value={i}>{i}</option>
                                ))
                            }
                        </Select>
                        <Select onChange={handleChange} variant='filled' name="timeZone" id="" placeholder="Select Time Zone">
                            <option value={'AM'}>AM</option>
                            <option value="PM">PM</option>
                        </Select>
                        <Select onChange={handleChange} variant='filled' name="tone" id="" placeholder="Select Ringtone">
                            <option value='comedy'>Comedy Tone</option>
                            <option value="flute">Flute Tone</option>
                            <option value="instrumental">Instrumental Tone</option>
                        </Select>
                    </Stack>
                    <Button onClick={setHandleAlarm} variant='outline' colorScheme={'white'} color='white' my='5' leftIcon={<BellIcon />}>Set Alarm</Button>
                </Box>
            </Box>
        </Box>
    )
}