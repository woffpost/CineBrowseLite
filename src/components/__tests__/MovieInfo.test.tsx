import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { MovieInfo } from '../MovieInfo'

const mockMovie = {
    title: 'Интерстеллар',
    tagline: 'Матч за пределами нашей галактики',
    overview: 'Путешествие исследователей сквозь кротовую нору.',
    vote_average: 8.632,
    release_date: '2014-11-06',
    runtime: 169,
    poster_path: '/path.jpg',
    genres: [{ id: 1, name: 'Фантастика' }, { id:2, name: 'Драма' }],
    budget: 165000000,
}

describe('Компонент MovieInfo', () => {
    test('Правильно отображает заголовок, слоган и описание фильма', () => {
        render(<MovieInfo movie={mockMovie} />);

        expect(screen.getByText('Интерстеллар')).toBeInTheDocument();
        expect(screen.getByText('Матч за пределами нашей галактики')).toBeInTheDocument();
        expect(screen.getByText('Путешествие исследователей сквозь кротовую нору.')).toBeInTheDocument();
    })

    test('Округляет рейтинг до одного знака после запятой', () => {
        render(<MovieInfo movie={mockMovie} />);
        expect(screen.getByText('IMDb 8.6')).toBeInTheDocument();
    })
})