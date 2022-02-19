import { VStack, Heading, Text, Image, Button, Box, SimpleGrid, Center } from '@chakra-ui/react';
import { NextPage } from 'next'
import React, {useState, useEffect} from 'react';

const Game: NextPage = () => {

    const [userChoice, setMyChoice] = useState('rock');
    const [computerChoice, setComputerChoice] = useState('rock');
    const [clicked, setClick] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [machinePoints, setMachinePoints] = useState(0);
    const [turnResult, setTurnResult] = useState('make a move!');
    const [playerAverage, setAverage] = useState(0);

    const choices = ['rock', 'paper', 'scissors'];

    const handleOnClick = (choice: string) => {
        setMyChoice(choice);
        generateComputerChoice();
        setClick(clicked+1);
    }

    const generateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice);
    }

    const reset = () => {
        window.location.reload();
    }

    useEffect(() => {
        const comboMoves = userChoice + computerChoice;
        if(comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper'){
            const updatedUserPoints = userPoints + 1;
            setUserPoints(updatedUserPoints);
            setTurnResult('User point!');
        }
        if(comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper'){
            const updatedComputerPoints = machinePoints + 1;
            setMachinePoints(updatedComputerPoints);
            setTurnResult('Machine point :(');
        }
        if(comboMoves === 'scissorsscissors' || comboMoves === 'rockrock' || comboMoves === 'paperpaper'){
            setTurnResult('Tie');
        }

        const updatedAverage = Math.floor((userPoints/(machinePoints + userPoints)) * 100);
        setAverage(updatedAverage);

    },[clicked]);

    useEffect(() =>{
        const updatedAverage = Math.floor((userPoints/(machinePoints + userPoints)) * 100);
        setAverage(updatedAverage);
    },[userPoints, machinePoints])

  return (

    <VStack alignItems="center">]
        <SimpleGrid columns={1} spacing = {10}>
            <Heading size='3xl' pt="5" pb='5'>
                Rock Paper Scissors
            </Heading>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing = {10} spacingY='15px'>

            <Box height={'45'}>
                <Heading textAlign={'center'} size="lg">
                    User Points
                </Heading>
            </Box>
            <Box height={'45'}>
                <Heading textAlign={'center'} size="lg">
                    Computer Points
                </Heading>
            </Box>

            <Box height={'45'}>
                <Heading textAlign={'center'}>
                    {userPoints}
                </Heading>
            </Box>
            <Box height={'45'}>
                <Heading textAlign={'center'}>
                    {machinePoints}
                </Heading>
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} spacing = {10}>
            <Heading pb='5'>
                <Box w='300px'>
                    Win rate: {playerAverage}%
                </Box>
            </Heading>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing = {20}>
                <Image boxSize='200px' src={`/${userChoice}.png`} alt=''></Image>
                <Image boxSize='200px' src={`/${computerChoice}.png`} alt=''></Image>
        </SimpleGrid>

        <SimpleGrid columns={3} spacing = {20}>
            <Button size='lg' colorScheme={'orange'} onClick={() => handleOnClick('rock')}>Rock</Button>
            <Button size='lg' colorScheme={'green'} onClick={() => handleOnClick('paper')}>Paper</Button>
            <Button size='lg' colorScheme={'teal'} onClick={() => handleOnClick('scissors')}>Scissors</Button>
        </SimpleGrid>


        <Text>Turn Results: {turnResult}</Text>

        <Button colorScheme='red' onClick={()=> reset()}>Reset the game</Button>
        <Button as="a" colorScheme="blue" href="/app/nextPage">Next Page</Button>

      </VStack>
  )
}

export default Game;