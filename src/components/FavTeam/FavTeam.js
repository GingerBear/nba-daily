import React from 'react';
import Select from 'react-select';

var options = [
  { value: 'atl', label: 'Atlanta Hawks' },
  { value: 'bkn', label: 'Brooklyn Nets' },
  { value: 'bos', label: 'Boston Celtics' },
  { value: 'cha', label: 'Charlotte Hornets' },
  { value: 'chi', label: 'Chicago Bulls' },
  { value: 'cle', label: 'Cleveland Cavaliers' },
  { value: 'dal', label: 'Dallas Mavericks' },
  { value: 'den', label: 'Denver Nuggets' },
  { value: 'det', label: 'Detroit Pistons' },
  { value: 'gsw', label: 'Golden State Warriors' },
  { value: 'hou', label: 'Houston Rockets' },
  { value: 'ind', label: 'Indiana Pacers' },
  { value: 'lac', label: 'Los Angeles Clippers' },
  { value: 'lal', label: 'Los Angeles Lakers' },
  { value: 'mem', label: 'Memphis Grizzlies' },
  { value: 'mia', label: 'Miami Heat' },
  { value: 'mil', label: 'Milwaukee Bucks' },
  { value: 'min', label: 'Minnesota Timberwolves' },
  { value: 'nop', label: 'New Orleans Pelicans' },
  { value: 'nyk', label: 'New York Knicks' },
  { value: 'okc', label: 'Oklahoma City Thunder' },
  { value: 'orl', label: 'Orlando Magic' },
  { value: 'phi', label: 'Philadelphia 76ers' },
  { value: 'phx', label: 'Phoenix Suns' },
  { value: 'por', label: 'Portland Trail Blazers' },
  { value: 'sac', label: 'Sacramento Kings' },
  { value: 'sas', label: 'San Antonio Spurs' },
  { value: 'tor', label: 'Toronto Raptors' },
  { value: 'uta', label: 'Utah Jazz' },
  { value: 'was', label: 'Washington Wizards' }
];

function FavTeam(props) {
  return (
    <Select
      name="fav-teams"
      isMulti
      closeMenuOnSelect={false}
      value={props.favTeams}
      options={options}
      onChange={props.onChange}
    />
  );
}

export default FavTeam;
