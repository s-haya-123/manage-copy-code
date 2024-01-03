// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Manager, App};

use std::fs::File;
use std::io::{BufRead, BufReader, Seek, SeekFrom};
use std::time::Duration;
use std::thread;
use std::sync::mpsc::{self, Receiver};


fn tail(app: &mut App, rx: Receiver<String>) {
  let app_handler = app.app_handle();

    thread::spawn(move || {
      let path = rx.recv().unwrap();
      println!("I was invoked from JS! {}", path);
    
      let mut file = File::open(&path).expect("failed to open file");
      file.seek(SeekFrom::End(0)).expect("failed to seek");
  
      let mut reader = BufReader::new(file);

      loop {
        let mut buf = String::new();
        match reader.read_line(&mut buf) {
            Ok(0) => {
                // ファイルの末尾に達したので、少し待機
                thread::sleep(Duration::from_millis(500));
            }
            Ok(_) => {
                print!("{}", buf);
                app_handler.emit_all("World", buf).unwrap();
            }
            Err(e) => eprintln!("Error reading file: {}", e),
        }
      }
  });
}

fn main() {
  tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    let (tx, rx) = mpsc::channel();

    let id = app.listen_global("tail", move |event| {
      let path = event.payload().unwrap().replace("\"", "");
      tx.send(path).unwrap();
  });
  tail(app, rx);
    Ok(())
  })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
