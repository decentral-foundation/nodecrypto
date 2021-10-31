extern crate quick_csv;
use std::io::{self, Write};


fn main()-> Result<(), std::io::Error>  {
    let stdout = io::stdout();

    let data = "a,b,c\r\nc,d,e\r\ne,f,g";
    print_type_of(&data);

    let mut d = quick_csv::Csv::from_string(data);
    print_type_of(&d);


    let r = d.next().unwrap().unwrap();
    print_type_of(&r);


    let c = r.bytes_columns().collect::<Vec<_>>();
    assert_eq!(c, vec![b"a", b"b", b"c"]);


    let moreData = "a,b\r\nc,d\r\ne,f";
    let csv = quick_csv::Csv::from_string(moreData);

    
    let mut handle = stdout.lock();
    print_type_of(&handle);

    handle.write_all(b"hello world")?;

    Ok(())    
}



fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}