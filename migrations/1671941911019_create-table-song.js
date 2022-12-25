/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('song', {
    id: {
      type: 'VARCHAR(16)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
      null: true,
    },
    album_id: {
      type: 'VARCHAR(16)',
      null: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('song');
};
