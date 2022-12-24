/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('album', {
    id: {
      type: 'VARCHAR(16)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
  });

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
      references: 'album',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('song');
  pgm.dropTable('album');
};
