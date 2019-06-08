import React from 'react';
import { t } from 'ttag';
import styled from 'styled-components';

import MapPinWithPlusIcon from './MapPinWithPlusIcon';
import BellIcon from './BellIcon';
import { UserIcon } from '../icons/ui-elements/index';

interface Props {
  mappedPlacesCount: number;
  invitedParticipantCount: number;
  startDate: Date;
  endDate: ?Date;
  className: string;
}

const Statistics = ({
  mappedPlacesCount,
  invitedParticipantCount,
  startDate,
  endDate,
  className,
}: Props) => {
  // translator: Screenreader description for the statistics/numbers part of a mapping event
  const statisticsRegionAriaLabel = t`Mapping Event Zahlen`;
  // translator: Description for number of already mapped places in the mapping event
  const mappedPlacesLabel = t`Neue Orte`;
  // translator: Description for number of people invited to the current mapping event
  const inviteesCountAriaLabel = t`Teilnehmer`;
  // translator: Description for number of days left in the mapping event
  const daysLeftLabel = t`Verbleibende Tage`;

  const remainingDaysLeft =
    endDate && endDate > new Date()
      ? Math.floor((endDate - startDate) / 1000 / 60 / 60 / 24) + 1
      : null;

  return (
    <section className={className} aria-label={statisticsRegionAriaLabel}>
      <div className="statistic">
        <div className="statistic-count">
          <MapPinWithPlusIcon />
          <span>{mappedPlacesCount}</span>
        </div>
        <div className="statistic-description">{mappedPlacesLabel}</div>
      </div>
      <div className="statistic">
        <div className="statistic-count">
          <UserIcon />
          <span>{invitedParticipantCount}</span>
        </div>
        <div className="statistic-description">{inviteesCountAriaLabel}</div>
      </div>
      {remainingDaysLeft && (
        <div className="statistic">
          <div className="statistic-count">
            <BellIcon />
            <span>{remainingDaysLeft}</span>
          </div>
          <div className="statistic-description">{daysLeftLabel}</div>
        </div>
      )}
    </section>
  );
};

const StyledStatistics = styled(Statistics)`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
  }

  .statistic {
    width: 100%;
  }

  .statistic-count {
    font-size: 27px;
    font-weight: 300;
    color: #37404d;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .statistic-description {
    font-size: 14px;
    color: #22262d;
  }
`;

export default StyledStatistics;
