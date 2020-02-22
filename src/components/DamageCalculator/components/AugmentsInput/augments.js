import { BuffAccessor } from "../../calculator";


export default [
    {
        name: 'Augment Attack',
        levels: [
            {
                name: 'Attack Increase x 1',
                [BuffAccessor.TRUE_ATTACK]: 5
            },
            {
                name: 'Attack Increase x 2',
                [BuffAccessor.TRUE_ATTACK]: 10
            },
            {
                name: 'Attack Increase x 3',
                [BuffAccessor.TRUE_ATTACK]: 15
            },
            {
                name: 'Attack Increase x 4',
                [BuffAccessor.TRUE_ATTACK]: 20
            }
        ]
    },
    {
        name: 'Augment Affinity',
        levels: [
            {
                name: 'Affinity Increase x 1',
                [BuffAccessor.AFFINITY_PCT]: 10
            },
            {
                name: 'Affinity Increase x 2',
                [BuffAccessor.AFFINITY_PCT]: 15
            },
            {
                name: 'Affinity Increase x 3',
                [BuffAccessor.AFFINITY_PCT]: 20
            },
            {
                name: 'Affinity Increase x 4',
                [BuffAccessor.AFFINITY_PCT]: 25
            }
        ]
    },
    {
        name: 'Augment Element',
        levels: [
            {
                name: 'Element Effect Up x 1',
                [BuffAccessor.TRUE_ELEMENT]: 3
            },
            {
                name: 'Element Effect Up x 2',
                [BuffAccessor.TRUE_ELEMENT]: 6
            },
            {
                name: 'Element Effect Up x 3',
                [BuffAccessor.TRUE_ELEMENT]: 9
            },
            {
                name: 'Element Effect Up x 4',
                [BuffAccessor.TRUE_ELEMENT]: 12
            }
        ]
    }
];
