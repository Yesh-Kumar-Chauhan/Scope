import React, { memo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarProps {
  events: any[];
  onEventClick: (event: any) => void;
  eventContent?: (arg: any) => React.ReactNode;
}

const Calendar: React.FC<CalendarProps> = ({ events, onEventClick, eventContent }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
        // right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      views={{
        month: {
          eventTimeFormat: { // Hide time in Month view
            hour: 'numeric', minute: '2-digit', omitZeroMinute: true
          },
          eventContent: function (arg) {
            const backgroundColor = arg.event.backgroundColor || '#8ECAE6'; // Default background color
            const textColor = arg.event.textColor || '#000000'; // Default text color
            const titleLines = Array.isArray(arg.event.title)
              ? arg.event.title // Use title as an array if it is already
              : arg.event.title.split('\n'); // Otherwise, split it into lines
          
            return (
              <div
                style={{
                  backgroundColor,
                  color: textColor,
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  lineHeight: '14px',
                  borderRadius: '4px',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column', // Ensures each line is stacked
                }}
              >
                {titleLines.map((line, index) => (
                  <div key={index}>{line}</div> // Render each line as a separate div
                ))}
              </div>
            );
          }
        },
        week: {
          eventTimeFormat: { // Show time in Week view
            hour: '2-digit', minute: '2-digit', meridiem: false
          }
        },
        day: {
          eventTimeFormat: { // Show time in Day view
            hour: '2-digit', minute: '2-digit', meridiem: false
          }
        }
      }}
      // views={{
      //   month: {
      //     eventTimeFormat: { // Hide time in Month view
      //       hour: '2-digit',
      //       minute: '2-digit',
      //       omitZeroMinute: true,
      //       meridiem: false // By default, this hides time
      //     }
      //   },
      //   week: {
      //     eventTimeFormat: { // Show time in Week view
      //       hour: '2-digit',
      //       minute: '2-digit',
      //       meridiem: false // Optionally use 24-hour format
      //     }
      //   },
      //   day: {
      //     eventTimeFormat: { // Show time in Day view
      //       hour: '2-digit',
      //       minute: '2-digit',
      //       meridiem: false // Optionally use 24-hour format
      //     }
      //   }
      // }}
      editable={true}
      droppable={true}
      events={events}
      eventClick={(info) => onEventClick(info.event)}
      eventContent={eventContent}
    />
  );
};

export default memo(Calendar);